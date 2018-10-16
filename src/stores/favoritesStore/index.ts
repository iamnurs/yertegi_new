import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class FavoritesStore {
  @persist
  @observable
  public favorites: string[] = [];

  public rootStore;

  public handleFavorites = favorite => {
    this.checkIfInFavorites(favorite)
      ? this.addFavorite(favorite)
      : this.deleteFavorite(favorite);
  };

  public checkIfInFavorites = favorite => {
    return this.favorites.indexOf(favorite) < 0;
  };

  @action
  public addFavorite = favorite => {
    this.favorites = [...this.favorites, favorite];
  };

  @action
  public deleteFavorite = favorite => {
    this.favorites = this.favorites.filter(item => item !== favorite);
  };

  @action
  public setFavorites = favorites => {
    this.favorites = favorites;
  };
}

export default FavoritesStore;
