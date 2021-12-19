import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Detail from "./Detail";

import { detailsEnum } from "../../base/enum";

test("render detail content", () => {
  const month = detailsEnum[0];
  const detailProps = {
    key: month.action,
    label: month.label,
    action: month.action,
    balance: 1000,
    coinPrice: "160,00",
    hours: 160,
  };
  const component = render(
    <Detail
      key={detailProps.key}
      label={detailProps.label}
      action={detailProps.action}
      balance={detailProps.balance}
      coinPrice={detailProps.coinPrice}
      hours={detailProps.hours}
    />
  );
  component.getByText("$ 1000");
  expect(component.container).toHaveTextContent('$ 1000')
});

test.skip("render detailt content with 0$", () => {
  const month = detailsEnum[0];
  const detailProps = {
    key: month.action,
    label: month.label,
    action: month.action,
    balance: 1000,
    coinPrice: '0',
    hours: 160,
  };
  const component = render(
    <Detail
      key={detailProps.key}
      label={detailProps.label}
      action={detailProps.action}
      balance={detailProps.balance}
      hours={detailProps.hours}
    />
  );
  component.getByText("$ 0,00");
  expect(component.container).toHaveTextContent('$ 0,00')
});