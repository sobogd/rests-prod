export const setTableForPrinting = (
  title: string,
  items: { label: string; value: string | number }[]
) => {
  const existTable = document.querySelector(".tableForPrint");
  if (existTable) {
    existTable.remove();
  }

  const table = document.createElement("table");
  table.setAttribute(
    "style",
    "border: 1px solid black;border-collapse: collapse;max-width: 250px"
  );
  table.setAttribute("class", "tableForPrint");

  const thead = document.createElement("thead");
  thead.setAttribute(
    "style",
    "border: 1px solid black;border-collapse: collapse"
  );

  const trForThead = document.createElement("tr");
  trForThead.setAttribute(
    "style",
    "border: 1px solid black;border-collapse: collapse"
  );

  const thForThead = document.createElement("th");
  thForThead.setAttribute(
    "style",
    "border: 1px solid black;border-collapse: collapse"
  );
  thForThead.setAttribute("colspan", "2");
  thForThead.textContent = title;

  trForThead.appendChild(thForThead);
  thead.appendChild(trForThead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.setAttribute(
    "style",
    "border: 1px solid black;border-collapse: collapse"
  );

  items.forEach((item) => {
    const trForItem = document.createElement("tr");
    trForItem.setAttribute(
      "style",
      "border: 1px solid black;border-collapse: collapse"
    );

    const tdLabel = document.createElement("td");
    tdLabel.setAttribute(
      "style",
      "border: 1px solid black;border-collapse: collapse"
    );
    tdLabel.textContent = item.label;

    const tdValue = document.createElement("td");
    tdValue.setAttribute(
      "style",
      "border: 1px solid black;border-collapse: collapse"
    );
    tdValue.textContent = item.value.toString();

    trForItem.appendChild(tdLabel);
    trForItem.appendChild(tdValue);
    tbody.appendChild(trForItem);
  });

  table.appendChild(tbody);

  document.body.appendChild(table);
};
