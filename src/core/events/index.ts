import { AppState } from 'react-native';

/**
 * Log severities
 */
enum Severity {
  INFO,
  ERROR,
}

/**
 * Event types.
 */

export interface Event {
  name: string;
}

//TODO update this when user is formed
export interface User {
  userId: string;
}

export interface Log {
  severity: Severity;
  loggerName: string;
  msg: string;
}

export interface Error {
  msg: string;
  details?: Record<string, unknown>;
}

interface Handler<T> {
  // Will be called for each payload.
  handler(payload: T): void;

  mapper?(payload: T): T;

  // to be called after each batch of payloads is added to mark
  // end of current batch.
  flushBatch?(): void;
}

class EventsImpl {
  handlers: { [type: string]: Array<Handler<any>> } = {};
  buffer: { [type: string]: any[] } = {};
  common: Record<string, unknown> = {};
  timer: number = 0;
  appState: string = AppState.currentState;

  /**
   * Set a bunch of common props to be sent with every event.
   * @param common Map of common props
   */
  setCommonProps(common: Record<string, unknown>) {
    this.common = {
      ...this.common,
      ...common,
    };
  }

  constructor() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  private handleAppStateChange = (nextAppState: string) => {
    if (
      this.appState &&
      this.appState.match(/active|inactive/) &&
      nextAppState === 'background'
    ) {
      this.flush();
    }
    this.appState = nextAppState;
  };

  /**
   * Attach a handler for a specific type of event.
   * There can be any number of handlers for every event type.
   * @param type Type of event
   * @param handler Handler method
   * @param mapper Optional mapper to transform event before handling
   */
  on<T extends Event | Log | Error | User>(
    type: 'event' | 'log' | 'error' | 'login' | 'logout',
    handler: (payload: T) => void,
    mapper?: (payload: T) => T,
    flushBatch?: () => void,
  ) {
    if (!this.handlers[type]) {
      this.handlers[type] = [] as Array<Handler<T>>;
    }
    this.handlers[type].push({ handler, mapper, flushBatch });
  }

  /**
   * Emits an event of given type
   * @param type Type of event
   * @param payload Event payload
   */
  private queue<T extends Event | Log | Error | string>(
    type: 'event' | 'log' | 'error',
    payload: T,
  ) {
    if (!this.buffer[type]) {
      this.buffer[type] = [] as T[];
    }
    this.buffer[type].push(payload);
  }

  /**
   * Emit an event.
   * @param name Name of the event
   * @param details Optional props describing event in more detail
   */
  track(name: string, details?: Record<string, unknown>) {
    this.queue('event', {
      name,
      ...details,
      ...this.common,
    });
  }

  /**
   * Emit a log line.
   * @param severity Log severity
   * @param loggerName Logger name
   * @param msg Log message
   * @param details Optional props describing the log in more detail
   */
  log(
    severity: Severity,
    loggerName: string,
    msg: string,
    details?: Record<string, unknown>,
  ) {
    this.queue('log', {
      severity,
      loggerName,
      msg,
      ...details,
    });
  }

  /**
   * Emit an error.
   * @param msg Error message
   * @param details Optional props describing the error in more detail
   */
  error(msg: string, details?: Record<string, unknown>) {
    this.queue('error', {
      msg,
      ...details,
      ...this.common,
    });
  }

  /**
   * Login a user.
   */
  login(user: User) {
    this.pushForType('login', user);
  }

  /**
   * Logout a user.
   */
  logout() {
    this.common = {};
    this.pushForType('logout', '');
  }

  /**
   * Flush all pending events once.
   */
  flush() {
    const old = this.buffer;
    this.buffer = {};
    Object.keys(old).forEach((type) => {
      old[type].forEach((payload) => {
        this.pushForType(type, payload);
      });
      this.flushForType(type);
    });
  }

  private pushForType(type: string, payload: any) {
    if (this.handlers[type]) {
      this.handlers[type].forEach(({ handler, mapper }) => {
        handler(mapper ? mapper(payload) : payload);
      });
    }
  }

  private flushForType(type: string) {
    if (this.handlers[type]) {
      this.handlers[type].forEach(({ handler, mapper, flushBatch }) => {
        if (flushBatch) {
          flushBatch();
        }
      });
    }
  }

  /**
   * Start a timer to flush all pending events every few miliseconds.
   * @param ms Time interval in miliseconds
   */
  flushEvery(ms: number) {
    const ref = this;
    if (ref.timer) {
      clearTimeout(ref.timer);
    }
    // @ts-ignore
    ref.timer = setTimeout(() => {
      ref.flush();
      ref.flushEvery(ms);
    }, ms);
  }
}

export const Events = new EventsImpl();
