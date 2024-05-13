export interface GetStoresResponse {
    stores: Store[];
}

export interface Store {
    id: string;
    clientId: string;
    name: string;
    domain: string | null;
    type: string;
    status: string;
    currency: string;
    settlementCurrency: string;
    orderApproval: string;
    isNotConnectedProductsEnabled: boolean;
    autoApproveUrl: string | null;
    autoApproveAfter: string | null;
    printFileFieldNames: string[];
    isOutOfStockSyncEnabled: boolean;
    outOfStockRegion: string;
    stockRegion: string;
    customVariantIdFieldName: string | "" | null | undefined;
    isLiveRatesEnabled: boolean;
    isLiveFreeShippingEnabled: boolean;
    isNotConnectedOrdersCommunicationEnabled: boolean;
    shippingMargin: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    personalizationSettings: string | null;
    disableShippingProfiles: boolean;
    isLiveRatesEstimatedDatesEnabled: boolean;
    primaryLanguage: string | null;
    liveRatesIncreaseDays: number;
    iossNumber: string | null;
    storeReconnectURL: string | null;
    externalConnectionId: string | null;
    integrationUpgradeRequired: boolean;
    shippingOriginCountryIso: string | null;
    shippingOriginPostalCode: string | null;
    reconnectionReasonCode: string | null;
    disablePersonalizationEmails: boolean;
    approvalTypeOverrideTags: string[];
    isPersonalizedOrderManualApprovalEnabled: boolean;
    isAIPersonalizedOrderManualApprovalEnabled: boolean;
}
