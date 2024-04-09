import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import {
  Content,
  ContentColumns,
  Margins,
  PageSize,
  StyleDictionary,
  Table,
  TableCell,
  TDocumentDefinitions,
} from "pdfmake/interfaces";

interface pdfMakeProps {
  tableColumns: string[];
  tableRows: (string | number)[][];
  totalRows: (string | number)[];
}

const formatNumber = (value: number) =>
  value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const openPdfMake = ({
  tableColumns,
  tableRows,
  totalRows,
}: pdfMakeProps) => {
  /**
   * PDF styles
   */
  const styles: StyleDictionary = {
    TABLESTYLE: {
      fontSize: 8,
    },
    TABLEHEADER: {
      fillColor: "#d2d2d4",
      bold: true,
      fontSize: 8,
      alignment: "center",
    },
  };

  /**
   * Create default settings
   */
  const pageMargins: Margins = 20;
  const pageSize: PageSize = "LETTER";

  /**
   * Table Content
   */
  const table: Table = {
    body: [
      tableColumns.map((value): TableCell => {
        return { text: value, style: styles["TABLEHEADER"] };
      }),
      ...tableRows.map((arr) =>
        arr.map((value) =>
          value && typeof value === "number" ? formatNumber(value) : value
        )
      ),
      totalRows.map((value, index): TableCell => {
        const tableCell: TableCell = !index
          ? {
              text: value,
              colSpan: 5,
              style: { alignment: "right", fontSize: 10, bold: true },
            }
          : {
              text:
                value && typeof value === "number"
                  ? formatNumber(value)
                  : value,
            };
        return tableCell;
      }),
    ],
  };

  const pageHeader: ContentColumns = {
    columns: [
      [
        {
          text: "Whitehouse Apartment Management",
          style: { alignment: "left" },
        },
        {
          text: "Income Report",
          style: { alignment: "left" },
        },
      ],
    ],
    columnGap: 10,
  };

  /**
   * Document Content
   */
  const content: Content[] = [
    { ...pageHeader },
    {
      margin: [0, 10, 10, 0],
      style: styles["TABLESTYLE"],
      table,
    },
  ];

  const document: TDocumentDefinitions = { content, pageMargins, pageSize };

  pdfMake.createPdf(document).open();
};
