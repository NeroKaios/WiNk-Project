import {IndustryIdentifier} from "./IndustryIdentifier";
import {ReadingModes} from "./ReadingModes";
import {PanelizationSummary} from "./PanelizationSummary";
import {ImageLinks} from "./ImageLinks";


export interface VolumeInfo {
  title:               string;
  subtitle:            string;
  authors:             string[];
  publishedDate:       string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes:        ReadingModes;
  pageCount:           number;
  printType:           string;
  categories:          string[];
  maturityRating:      string;
  allowAnonLogging:    boolean;
  contentVersion:      string;
  panelizationSummary: PanelizationSummary;
  imageLinks:          ImageLinks;
  language:            string;
  previewLink:         string;
  infoLink:            string;
  canonicalVolumeLink: string;
}
