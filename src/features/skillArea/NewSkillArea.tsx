import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { submitSkillAreaToApi } from "./submitSkillAreaSlice";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: 20,
  },
});

export default function NewSkillArea() {
  const { data: session, status } = useSession();
  const authenticated = status === "authenticated";
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && !authenticated) return null;
  const submitSkillAreas = useAppSelector((state) => state.submitSkillAreas);

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const classes = useStyles();
  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitleError(false);
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescriptionError(false);
    setDescription(event.target.value);
  };

  return (
    <Card className={classes.root} data-testid="newSkillAreaFormCard">
      <CardContent>
        <div>
          <Typography
            variant="h5"
            component="h3"
            data-testid="submitNewSkillAreaHeader"
          >
            Submit A New Skill Area
          </Typography>
          <TextField
            label="Title"
            required
            error={titleError}
            helperText={titleError ? "Missing" : undefined}
            id="newSkillArea-titleInput"
            type="text"
            value={title || ""}
            onChange={handleTitleChange}
          />
          <TextField
            label="Description"
            required
            error={descriptionError}
            helperText={descriptionError ? "Missing" : undefined}
            id="newSkillArea-descriptionInput"
            type="text"
            value={description || ""}
            onChange={handleDescriptionChange}
          />
          <Button
            id="newSkillArea-submitBtn"
            variant="contained"
            disabled={submitSkillAreas.loading}
            onClick={() => {
              if (!title || !description) {
                if (!title) {
                  setTitleError(true);
                }
                if (!description) {
                  setDescriptionError(true);
                }
                return;
              }
              dispatch(submitSkillAreaToApi({ title, description }));
              setTitle("");
              setDescription("");
            }}
          >
            {submitSkillAreas.loading ? "Hang On" : "Submit New Skill Area"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
