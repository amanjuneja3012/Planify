import React, { ReactNode } from 'react';
import codePush, {
  DownloadProgress,
  LocalPackage,
  Package,
  StatusReport,
} from 'react-native-code-push';
import { CodePushContext } from './helper/codepush';
import TimeUnit from './lib/time';

interface CodePushStatus {
  receivedBytes: number;
  totalBytes: number;
  codePushStatus?: codePush.SyncStatus;
  metadata: Package | null;
  lastChecked: number;
}

export default class CodepushProvider extends React.Component<
  { children: ReactNode },
  CodePushStatus
> {
  readonly state: Readonly<CodePushStatus> = {
    receivedBytes: 0,
    totalBytes: 0,
    metadata: null,
    lastChecked: 0,
  };

  componentDidMount(): void {
    this.fetchAndUpdateMetadata();
    this.fetchNotifyAppReady();
    // GlobalEventEmitter.addListener(GlobalEventName.JSPACK_UPDATE_APPLY, this.applyUpdate);
  }

  componentWillUnmount() {
    // GlobalEventEmitter.removeListener(GlobalEventName.JSPACK_UPDATE_AVAILABLE, this.applyUpdate);
  }

  applyUpdate = () => {
    setTimeout(() => codePush.restartApp(), 500);
  };

  private fetchAndUpdateMetadata = () => {
    codePush.getUpdateMetadata().then((metadata: LocalPackage | null) => {
      console.log('####### CodePush', metadata);
      this.setState({ metadata });
    });
  };

  codePushStatusDidChange = (status: codePush.SyncStatus) => {
    this.setState({ codePushStatus: status });
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        // Events.track(EventNames.CODEPUSH_CHECKING_FOR_UPDATE);
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // Events.track(EventNames.CODEPUSH_DOWNLOADING_PACKAGE);
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        // Events.track(EventNames.CODEPUSH_INSTALLING_UPDATE);
        break;
      // case codePush.SyncStatus.UP_TO_DATE:
      //     console.log("Up-to-date.");
      //     break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // GlobalEventEmitter.emit(GlobalEventName.JSPACK_UPDATE_AVAILABLE,);
        // Events.track(EventNames.CODEPUSH_UPDATE_INSTALLED);
        break;
    }
  };

  codePushDownloadDidProgress = (progress: DownloadProgress) => {
    this.setState({
      receivedBytes: progress.receivedBytes,
      totalBytes: progress.totalBytes,
    });
  };

  private fetchNotifyAppReady = () => {
    codePush.notifyAppReady().then((report: StatusReport | void) => {
      if (report && report.status) {
        // Events.track(EventNames.CODEPUSH_SYNC_STATUS_REPORT, {
        //     'status': report.status,
        //     ...report.package ? {
        //         ...report.package
        //     } : {}
        // })
      }
    });
  };

  sync = async (deploymentKey: string, force?: boolean) => {
    if (
      force ||
      TimeUnit.clockTime() >
        this.state.lastChecked + TimeUnit.MILLISECONDS.fromHours(3)
    ) {
      if (__DEV__) return;
      await codePush.sync(
        {
          deploymentKey,
          rollbackRetryOptions: {
            delayInHours: 12,
            maxRetryAttempts: 4,
          },
        },
        this.codePushStatusDidChange,
        this.codePushDownloadDidProgress,
      );
      this.fetchAndUpdateMetadata();
      this.setState({ lastChecked: TimeUnit.clockTime() });
    }
  };

  render() {
    const { receivedBytes, totalBytes, metadata } = this.state;
    return (
      <CodePushContext.Provider
        value={{
          package: metadata,
          sync: this.sync,
          installPercent: totalBytes > 0 ? receivedBytes / totalBytes : 0,
          // jsPackVersion: RnpackConfig.rnPackVersion,
        }}
      >
        {this.props.children}
      </CodePushContext.Provider>
    );
  }
}
