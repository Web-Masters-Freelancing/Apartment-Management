import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import {
  Content,
  ContentColumns,
  ContentTable,
  Margins,
  PageSize,
  StyleDictionary,
  Table,
  TableCell,
  TDocumentDefinitions,
} from "pdfmake/interfaces";

interface pdfMakeProps {
  documentHeader: ContentColumns;
  tableColumns: string[];
  tableRows: (string | number)[][];
  totalRows: TableCell[];
}

export const styles: StyleDictionary = {
  TABLESTYLE: {
    fontSize: 8,
  },
  TABLEHEADER: {
    fillColor: "#d2d2d4",
    bold: true,
    fontSize: 8,
    alignment: "center",
  },
  HEADERLEFT: {
    fontSize: 8,
    alignment: "left",
  },
  HEADERRIGHT: {
    fontSize: 8,
    alignment: "right",
  },
};

export const formatNumber = (value: number) =>
  value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const openPdfMake = ({
  documentHeader,
  tableColumns,
  tableRows,
  totalRows,
}: pdfMakeProps) => {
  /**
   * PDF styles
   */

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
      totalRows,
    ],
  };

  /**
   * Document Content
   */
  const tableContent: ContentTable = {
    margin: [0, 10, 10, 0],
    style: styles["TABLESTYLE"],
    table,
  };
  const content: Content[] = [documentHeader, tableContent];

  const document: TDocumentDefinitions = { content, pageMargins, pageSize };

  pdfMake.createPdf(document).open();
};
