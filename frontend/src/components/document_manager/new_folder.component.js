import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";

import Button from "@material-ui/core/Button";

import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { new_folder } from "../../api/document_manager";
import { Alert, AlertTitle } from "@material-ui/lab";

function CompetencyCheckpoint({
  current_path,
  current_path_id,
  refresh_dir,
  folder_names,
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");

  const add_folder = () => {
    console.log("STATUS res.status");
    console.log("REFRESHED", folder_names);

    if (name != null && !folder_names.includes(name)) {
      new_folder(current_path_id, name, current_path).then((res) => {
        refresh_dir();

        if (res.status === 201) {
          setOpen(false);
        }
      });
    } else {
      console.log("oh no, we didn't get the note");
    }

    setOpen(false);
  };

  return (
    <div className="checkpoint-container">
      <Link
        component="button"
        variant="body2"
        style={{ marginRight: "15px", color: "#1565C0" }}
        onClick={() => setOpen(true)}
      >
        New Folder
        <input type="file" label={"fds"} hidden />
      </Link>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="form-dialog-title">Add New Folder</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <OutlinedInput
              placeholder="Folder name"
              onChange={(event) => {
                setError(null);
                if (name.length === 0) setError("Folder name cannot be empty");
                if (folder_names.includes(name))
                  setError("Folder already exists");
                setName(event.target.value);
              }}
              style={{ marginBottom: "10px" }}
              error={error != null}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} style={{ color: "#455A64" }}>
            Cancel
          </Button>
          <Button onClick={add_folder} style={{ color: "#01579B" }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CompetencyCheckpoint;
