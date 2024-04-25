import WidgetMainSection from "@/components/promotion/WidgetMainSection";
import TopBar from "@/components/shared/TopBar";

import React from "react";

const Widget = () => {
  return (
    <section>
      <TopBar title="Widget" />

      {/* main content */}

      <WidgetMainSection />
    </section>
  );
};

export default Widget;
