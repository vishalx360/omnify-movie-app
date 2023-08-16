import { api } from "@/utils/api";
import { Heart, Trash } from "lucide-react";
import type MovieDB from "node-themoviedb";
import { Button } from "./ui/button";

function AddToFavBtn({ movie }: { movie: MovieDB.Objects.Movie }) {
  const utils = api.useContext();
  const {
    data: exist,
    error,
    isLoading,
  } = api.favorite.doesExist.useQuery({ movie_id: String(movie.id) });

  const AddMutation = api.favorite.add.useMutation({
    onSuccess: () => {
      utils.favorite.doesExist.setData({ movie_id: String(movie.id) }, true);
    },
  });
  const RemoveMutation = api.favorite.remove.useMutation({
    onSuccess: () => {
      utils.favorite.doesExist.setData({ movie_id: String(movie.id) }, false);
    },
  });
  const handleToggel = () => {
    if (exist) {
      RemoveMutation.mutate({ movie_id: String(movie.id) });
    } else {
      AddMutation.mutate({
        ...movie,
        movie_id: String(movie.id),
        vote_average: String(movie.vote_average),
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
        disabled={
          isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        }
        onClick={handleToggel}
        LeftIcon={exist ? Trash : Heart}
      >
        {exist ? "Remove from favorite" : "Add to favorite"}
      </Button>
    </>
  );
}

export default AddToFavBtn;
