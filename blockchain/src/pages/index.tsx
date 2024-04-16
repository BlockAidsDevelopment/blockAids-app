import NearConnection from "@/components/NearConnection";
import "@near-wallet-selector/modal-ui/styles.css";
import ConnectWallet from "@/components/ConnectWallet";

const Home = () => {
  return (
    <div className="home-page">
      <ConnectWallet/>
    </div>
  )
}

export default Home;
