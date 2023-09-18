import { api } from "@/utils/api";
import { Heart, Trash } from "lucide-react";
import type MovieDB from "node-themoviedb";
import { Button } from "./ui/button";

function AddToFavBtn({
  movie,
}: {
  movie: MovieDB.Objects.Movie | MovieDB.Responses.Movie.GetDetails;
}) {
  const utils = api.useContext();
  const {
    data: exist,
    error,
    isLoading,
  } = api.favorite.doesExist.useQuery({ movie_id: movie.id });

  const AddMutation = api.favorite.add.useMutation({
    onSuccess: () => {
      utils.favorite.doesExist.setData({ movie_id: movie.id }, true);
    },
  });
  const RemoveMutation = api.favorite.remove.useMutation({
    onSuccess: () => {
      utils.favorite.doesExist.setData({ movie_id: movie.id }, false);
    },
  });
  const handleToggel = () => {
    if (exist) {
      RemoveMutation.mutate({ movie_id: movie.id });
    } else {
      AddMutation.mutate({
        movie_id: movie.id,
      });
    }
  };

  if (error) {
    return <Button variant="destructiveOutline">Some Error Occured</Button>;
  }
  return (
    <>
      <Button
        variant={exist ? "destructiveOutline" : "default"}
        isLoading={
          isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        }
        disabled={
          isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        }
        onClick={handleToggel}
        LeftIcon={exist ? Trash : Heart}
      >
        {isLoading
          ? "Loading.."
          : exist
          ? "Remove from favorite"
          : "Add to favorite"}
      </Button>
    </>
  );
}

export default AddToFavBtn;
