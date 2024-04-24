import {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import ConnectWallet from "@/components/ConnectWallet";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const FractalCB = () => {
  const searchParams = useSearchParams();

  const init = async (code: any) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          code: code,
        })
      };
      await fetch(`/api/fractalId`, requestOptions);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      init(code);
    }
  }, [searchParams]);

  return (
    <div className="home-page">
      <ConnectWallet/>
      <div className="divider"></div>
      <p>{"You've"} applied successfully for moderation!</p>
      <a href="http://localhost:3001">
        <Button><ArrowBackIosIcon/> go back</Button>
      </a>
    </div>
  )
}

export default FractalCB;
