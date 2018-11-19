export interface LocalDictionary {
    RequestId: string;
    DataItem: Object;
}


export class PolicyCache {
  private static cachedItems: LocalDictionary[] = [];

  static addItem(item: LocalDictionary) {
     PolicyCache.cachedItems.push(item);
  }

  static getItem(RequestId: string) {
    for (const item of PolicyCache.cachedItems) {
      if (RequestId.toUpperCase() === item.RequestId.toUpperCase()) {
        return item.DataItem;
      }
    }

    return undefined;
  }

  static removeItem(RequestId: string) {
    for (let i = 0; i < PolicyCache.cachedItems.length; i++) {
      if (RequestId.toUpperCase() === PolicyCache.cachedItems[i].RequestId.toUpperCase()) {
        PolicyCache.cachedItems = PolicyCache.cachedItems.splice(i, 1);
        break;
      }
    }
  }
}
