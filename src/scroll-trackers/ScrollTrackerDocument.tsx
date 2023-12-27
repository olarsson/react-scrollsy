import { useEffect, useState } from 'react';

import { childrenAsMethod } from '../functions/childrenAsMethod';
import type { ScrollTrackerDocumentProps } from '../types';
import { ScrollTrackerBoth } from './ScrollTrackerBoth';

export const ScrollTrackerDocument = ({ children, scrollThrottle, resizeThrottle }: ScrollTrackerDocumentProps) => {
  const [domReady, setDomReady] = useState<boolean>(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  return domReady ? (
    <ScrollTrackerBoth scrollThrottle={scrollThrottle} resizeThrottle={resizeThrottle}>
      {children}
    </ScrollTrackerBoth>
  ) : (
    childrenAsMethod({
      scrollData: {
        scrollTop: 0,
        scrollHeight: 0,
        containerHeight: 0,
        percentProgress: 0
      },
      children: children
    })
  );
};
