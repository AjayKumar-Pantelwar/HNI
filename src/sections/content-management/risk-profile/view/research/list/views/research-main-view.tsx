import { useEffect, useState } from 'react';
import { ResearchData, ResearchViews } from 'src/types/content-management/research.types';
import ImageLinkTag from './image-link-tag/image-link-tag';
import PDFLinkTag from './pdf-link-tag/pdf-link-tag';
import PDFTagList from './pdf-tag-list/pdf-tag-list';
import VideoDesignList from './vide-design-list/video-design-list';
import VideoGrid from './video-grid/video-grid';

// import { Tab1TableRow } from './table-row';

interface Props {
  data: ResearchData;
}

const ResearchMainView = (props: Props) => {
  const { data } = props;

  const [tab, setTab] = useState(data?.pages?.[0]?.type);

  const handleChange = (_event: React.SyntheticEvent, newValue: ResearchViews) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (data?.pages?.[0]?.type) {
      setTab(data?.pages?.[0]?.type);
    }
  }, [data]);

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

export default ResearchMainView;
