import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import tales from "../../../assets/tales";

type TalesKeyType = {
    image: number;
    name: string;
    text: string;
    audio: string;
}


class TalesStore {
  @persist
  @observable
  public tales: TalesKeyType[] = tales;

  public rootStore;

  public searchText = e => {
    this.setTales(tales);
    const text : string = e.toLowerCase();
    const foundTales :  TalesKeyType[] = tales;
    const filteredName : TalesKeyType[] = foundTales.filter(item => {
      return item.name.toLowerCase().match(text);
    });
    if (!text || text === "") {
      this.setTales(tales);
    } else if (!Array.isArray(filteredName) || !filteredName.length) {
      this.setTales([]);
    } else if (Array.isArray(filteredName)) {
      this.setTales(filteredName)
    }
  };

  @action
  public setTales = newTales => {
    this.tales = newTales;
  };
}

export default TalesStore;
