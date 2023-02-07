import {VolumeInfo} from "./VolumeInfo";
import {SaleInfo} from "./SaleInfo";
import {AccessInfo} from "./AccessInfo";
import {SearchInfo} from "./SearchInfo";

export interface Book {
  kind:       string;
  id:         string;
  etag:       string;
  selfLink:   string;
  volumeInfo: VolumeInfo;
  saleInfo:   SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}















