import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "../ButtonGroup/ButtonGroup.web";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import "./DataTable.web.css";

interface dataTableProps {
  rows: any;
  columns: any;
  onViewClick: any;
  onEditClick: any;
  onDeleteClick: any;
  isAction: boolean;
}

const DataTable = ({
  rows,
  columns,
  onViewClick,
  onEditClick,
  onDeleteClick,
  isAction,
}: dataTableProps) => {
  const onTableViewClick = (id: any) => {
    onViewClick(id);
  };
  const onTableEditClick = (id: any) => {
    onEditClick(id);
  };
  const onTableDeleteClick = (id: any) => {
    onDeleteClick(id);
  };
  const booleanValueCell = (value: any) => {
    return (
      <>
        {value ? (
          <TableCell className="tableCell">
            <CheckCircleRoundedIcon className="checkIcon" />
          </TableCell>
        ) : (
          <TableCell className="tableCell">
            <CancelRoundedIcon className="cancelIcon" />
          </TableCell>
        )}
      </>
    );
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table size="medium" aria-label="a dense table">
        <TableHead className="tableHeader">
          <TableRow>
            {columns.map((column: any) => (
              <TableCell className="tableHeaderCell" key={column}>
                {column}
              </TableCell>
            ))}
            {isAction && <TableCell className="tableCell" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => {
            const rowValues = Object.keys(row).map((key) => {
              return [row[key]];
            });
            return (
              <TableRow key={row._id}>
                {rowValues.map((rowValue: any, index: number) => {
                  return (
                    <>
                      {typeof rowValue[0] === "boolean" ? (
                        <>{booleanValueCell(rowValue[0])}</>
                      ) : (
                        <>
                          <TableCell className="tableCell" key={rowValue}>
                            {rowValue}
                          </TableCell>
                        </>
                      )}
                    </>
                  );
                })}
                {isAction && (
                  <TableCell className="tableCell">
                    <ButtonGroup
                      id={row._id}
                      onViewClick={onTableViewClick}
                      onEditClick={onTableEditClick}
                      onDeleteClick={onTableDeleteClick}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
