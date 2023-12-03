import { useEffect, useState } from 'react';

import { childrenAsMethod } from '../functions/childrenAsMethod';
import { IScrollTrackerDocument } from '../types';
import { ScrollTrackerBoth } from './ScrollTrackerBoth';

export const ScrollTrackerDocument = ({ children, scrollThrottle, resizeThrottle }: IScrollTrackerDocument) => {
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
        percentProgress: 0,
        element: undefined
      },
      children: children
    })
  );
};
