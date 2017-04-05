export interface IDecoded {
    action: IAction;
    sub_account: ISubAccount;
}
export interface IAction {
    assigned_at: string | null;
    canceled_at: string | null;
    completed_at: string | null;
    completed_place: IPlace | null;
    created_at: string | null;
    display: {
        duration_remaining: number | null;
        show_summary: boolean;
        status_text: string;
        sub_status_text: string;
    };
    distance: number;
    encoded_polyline: string;
    eta: string | null;
    expected_place: IPlace;
    id: string;
    initial_eta: string | null;
    lookup_id: string;
    short_code: string;
    started_at: string | null;
    started_place: IPlace | null;
    status: string;
    suspended_at: string | null;
    time_aware_polyline: string;
    tracking_url: string;
    type: string;
    user: IUser;
    vehicle_type: string;
}
export interface ISubAccount {
}
export interface IUser {
    name: string;
    phone: number | string | null;
    last_heartbeat_at: string | null;
    last_location: {
        geojson: IPlace;
    };
}
export interface IPlace {
    address: string;
    city: string;
    country: string;
    created_at: string;
    id: string;
    landmark: string;
    location: {
        coordinates: [number, number];
    };
    name: string;
    state: string;
    zip_code: string;
}
export interface ITrackOption {
    originLatLng: [number, number];
    mapId: string;
    bottomPadding: number;
    onError: (any) => void;
}
