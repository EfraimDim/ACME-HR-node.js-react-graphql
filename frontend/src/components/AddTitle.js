import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField } from "@mui/material";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { ADD_TITLE } from "../graphql/mutations";

function AddTitle() {
  const { setAddTitle, getMyOrganisationInfo } = useContext(AppContext);

  const [newTitleName, setNewTitleName] = useState("");

  const handleNewTitleName = (e) => {
    setNewTitleName(e.target.value);
  };

  const cancelAddTitle = () => {
    setAddTitle(false);
  };

  const [addTitle] = useMutation(ADD_TITLE, {
    onError: (error) => {
      swal({
        title: "Add Title Failed!",
        text: `${error.message}`,
        icon: "error",
        button: "okay",
      });
      console.log(error);
    },
    onCompleted: async (addTitleData) => {
      try {
        swal({
          title: "Success!",
          text: `${addTitleData.addTitle.message}`,
          icon: "success",
          button: "continue!",
        });
        await getMyOrganisationInfo();
        setAddTitle(false);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleAddTitle = async (ev) => {
    try {
      ev.preventDefault();
      await addTitle({
        variables: {
          titleName: newTitleName,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Add Title</h2>
        <div onClick={cancelAddTitle} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleAddTitle}>
        <div className={styles.formWrapper}>
          <TextField
            size="small"
            required
            type="text"
            value={newTitleName}
            onChange={handleNewTitleName}
            sx={{ margin: "20px" }}
            label="Title Name"
          />
        </div>
        <input className={styles.hrLink} value={"Add Title"} type="submit" />
      </form>
    </div>
  );
}

export default AddTitle;
