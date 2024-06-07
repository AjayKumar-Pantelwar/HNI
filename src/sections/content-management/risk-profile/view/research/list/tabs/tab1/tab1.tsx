import { useState } from 'react';
import { ResearchData, ResearchViews } from 'src/types/content-management/research.types';
import ImageLinkTag from '../../views/image-link-tag/image-link-tag';
import PDFLinkTag from '../../views/pdf-link-tag/pdf-link-tag';
import PDFTagList from '../../views/pdf-tag-list/pdf-tag-list';
import VideoDesignList from '../../views/vide-design-list/video-design-list';
import VideoGrid from '../../views/video-grid/video-grid';

// import { Tab1TableRow } from './table-row';

const TABLE_HEAD = [
  { id: 'image', label: 'Image' },
  { id: 'title', label: 'Title' },
  { id: 'video_name', label: 'Video Name' },
  { id: 'edit', label: 'Actions', width: 80 },
];

interface Props {
  data: ResearchData;
}

const ResearchTab1 = (props: Props) => {
  const { data } = props;

  const [tab, setTab] = useState(data?.page?.[0]?.type);

  const handleChange = (_event: React.SyntheticEvent, newValue: ResearchViews) => {
    setTab(newValue);
  };

  console.log(data);

  switch (tab) {
    case ResearchViews.PDF_TAG_LIST:
      return <PDFTagList data={data} handleChange={handleChange} tab={tab} />;
    case ResearchViews.VIDEO_GRID:
      return <VideoGrid data={data} handleChange={handleChange} tab={tab} />;
    case ResearchViews.PDF_LINK_TAG:
      return <PDFLinkTag data={data} handleChange={handleChange} tab={tab} />;
    case ResearchViews.IMAGE_LINK_TAG:
      return <ImageLinkTag data={data} handleChange={handleChange} tab={tab} />;
    case ResearchViews.VIDEO_DESIGN_LIST:
      return <VideoDesignList data={data} handleChange={handleChange} tab={tab} />;
    default:
      return <></>;
  }
};

export default ResearchTab1;
