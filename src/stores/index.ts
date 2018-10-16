import FavoritesStore from './favoritesStore';
import TalesStore from './talesStore';

class RootStore {
  public favoritesStore: FavoritesStore;
  public talesStore: TalesStore;
  constructor() {
    this.favoritesStore = new FavoritesStore();
    this.talesStore = new TalesStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
export { FavoritesStore, TalesStore};
