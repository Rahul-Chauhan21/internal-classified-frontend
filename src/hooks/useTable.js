import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: "9px",
    tableLayout: "fixed",
    overflowX: "auto",
    "& thead th": {
      fontWeight: "600",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tobdy tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
  tableHeader: {
    textAlign: "center",
  },
  pagination: {
    "& .MuiToolbar-gutters": {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
      },
    },
    "& .MuiTablePagination-actions": {
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
  },
}));

const useTable = (records, headCells) => {
  const classes = useStyles();
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              className={classes.tableHeader}
              key={headCell.id}
              scope="col"
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  //Pagination Events
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={pages}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      className={classes.pagination}
    />
  );

  const recordsAfterPaging = () => {
    return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaging,
  };
};

export default useTable;
