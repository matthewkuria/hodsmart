import BounceLoader from "react-spinners/BounceLoader";

export default function Loading() {
    return (
        <BounceLoader
           color="hsla(217, 90%, 48%, 1)"
            size={100}
            speedMultiplier={3}
        />
    )
}
