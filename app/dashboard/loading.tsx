import BounceLoader from "react-spinners/BounceLoader";

export default function Loading() {
    return (
        <BounceLoader
            color="#36d7b7"
            size={100}
            speedMultiplier={2}
        />
    )
}