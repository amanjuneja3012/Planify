import React from 'react';

export interface CodePushProps {
  package: Package | null;
  sync: (deploymentKey: string) => void;
  installStatus?: string;
  installPercent: number;
  // jsPackVersion: number;
}

export const CodePushContext = React.createContext({
  package: null as Package | null,
  // eslint-disable-next-line no-empty
  sync: (key: string) => {},
  installPercent: 0,
  // jsPackVersion: RnpackConfig.rnPackVersion,
});

export const CodepushConsumer = CodePushContext.Consumer;

export interface Package {
  /**
   * The app binary version that this update is dependent on. This is the value that was
   * specified via the appStoreVersion parameter when calling the CLI's release command.
   */
  appVersion: string;

  /**
   * The deployment key that was used to originally download this update.
   */
  deploymentKey: string;

  /**
   * The description of the update. This is the same value that you specified in the CLI when you released the update.
   */
  description: string;

  /**
   * Indicates whether this update has been previously installed but was rolled back.
   */
  failedInstall: boolean;

  /**
   * Indicates whether this is the first time the update has been run after being installed.
   */
  isFirstRun: boolean;

  /**
   * Indicates whether the update is considered mandatory. This is the value that was specified
   * in the CLI when the update was released.
   */
  isMandatory: boolean;

  /**
   * Indicates whether this update is in a "pending" state.
   * When true, that means the update has been downloaded and installed, but the app restart
   * needed to apply it hasn't occurred yet, and therefore, its changes aren't currently visible to the end-user.
   */
  isPending: boolean;

  /**
   * The internal label automatically given to the update by the CodePush server.
   * This value uniquely identifies the update within its deployment.
   */
  label: string;

  /**
   * The SHA hash value of the update.
   */
  packageHash: string;

  /**
   * The size of the code contained within the update, in bytes.
   */
  packageSize: number;
}

export class CodepushComponent extends React.Component<
  CodePushProps & { deploymentKey: string },
  {}
> {
  async componentDidMount() {
    const { deploymentKey, sync } = this.props;
    if (deploymentKey && sync) {
      await this.props.sync(deploymentKey);
      // GlobalEventEmitter.addListener(
      //     GlobalEventName.APP_SWITCHED_TO_FOREGROUND,
      //     this.appSwitchedToForegroundListener,
      // );
    } else {
      console.log('Sync is not available'); //eslint-disable-line
    }
  }

  componentWillUnmount() {
    // GlobalEventEmitter.removeListener(
    //     GlobalEventName.APP_SWITCHED_TO_FOREGROUND,
    //     this.appSwitchedToForegroundListener,
    // );
  }

  private appSwitchedToForegroundListener = async () => {
    const { deploymentKey, sync } = this.props;
    if (deploymentKey && sync) await this.props.sync(deploymentKey);
  };

  render() {
    return null;
  }
}
