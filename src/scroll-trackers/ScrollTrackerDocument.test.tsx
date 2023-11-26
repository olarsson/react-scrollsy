import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";

import { ScrollTrackerDocument } from "./ScrollTrackerDocument";
import { IScrollData } from "../types";

describe("<ScrollTrackerDocument />", () => {
  test("ScrollTrackerDocument mounts properly", () => {
    const wrapper = render(
      <ScrollTrackerDocument>
        {({ scrollData }: IScrollData) => (
          <>
            <h1>mounted</h1>
            <p className='element'>{scrollData.element?.nodeName}</p>
          </>
        )}
      </ScrollTrackerDocument>
    );

    expect(wrapper).toBeTruthy();

    // Get by h1
    const h1 = wrapper.container.querySelector("h1");
    expect(h1?.textContent).toBe("mounted");

    // Get by p
    const p = wrapper.container.querySelector("p.element");
    expect(p?.textContent).toBe("HTML");
  });
});
