export interface VisitorItem {
    id: number;
    visitorId: string;
    gclid?: string | null;
    utmSource?: string | null;
    utmCampaign?: string | null;
    converted: boolean;
    ip?: string | null;
    userAgent?: string | null;
    createdAt: string;
}

export interface VisitorsResponse {
    items: VisitorItem[];
    total: number;
    page: number;
    totalPages: number;
}

export interface VisitorFilters {
    page?: number;
    limit?: number;
    visitorId?: string;
    gclid?: string;
    converted?: boolean;
}
