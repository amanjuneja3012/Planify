
export interface Tab {
    id: string;
    label: string;
    // screen: //TODO
}

export interface BottomNavTab extends Tab {
    id: string;
    label: string;
    icon: JSX.Element;
    focussedIcon: JSX.Element;
    // screen: //TODO
    isPop?: boolean;
    badgeCount?: () => number;
    badgeEvent?: string;
    showNewAnimation?: () => boolean;
}