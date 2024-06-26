// import fs from "fs";

const Arweave = require("arweave");
const fs = require("fs");
export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
});

export const uploadJson = async () => {
  let metadata: string = `{
      "name": "Folder name 1"
  }`;

  metadata = metadata.trim();

  console.log(metadata);

  const metadataRequest = JSON.parse(JSON.stringify(metadata));

  const metadataTransaction = await arweave.createTransaction({
    data: metadataRequest,
  });

  metadataTransaction.addTag(
    "Content-Type",
    "application/json",
  );
  metadataTransaction.addTag("Entity-Type", "file");
  metadataTransaction.addTag(
    "Parent-Folder-Id",
    "BbfaztvTLZJbB_RHmmMbEhPfFxuydCIwJ37fVB-KsOs",
  );

  console.log(metadataTransaction);

  await arweave.transactions.sign(metadataTransaction, {
    d: "thVQKLdXGf8HN0I7SJiuSlkmKz8tPd7M_k6DIosPVpB47DGNoLc6SGnQ86Mxq6PEVAapVHyv_lTu4xAYkgoGH0Lg-azj7zdUyNhGR6N9CkXRftYg2LC9cPbHRCQjYlr4q7Czk96CJnxfpklyI8tYp5eW5g11ZW3QhKa2_0VAuXQMo8f4CJscWxQMjZ2QiuBOVY564rpFf5vwwxUsGUZEG-VDdQJl30LcMwaA2sjZ3pB0GLBhuMVG6Th6L5yO4hYjI0GaBLaQ7J5gBIAylINeMn43FfjGCmSVwPh9LeiAXtR3d66q00yWCHHLOQVEizID9bFwxLn-UgYloX5gu14hrqT1WTM3COXhfAGV1Z1CToTTE71AFA0mKts2Kbx55F-v3jrDjYuBkSQhhKluIPOXMFLe75CnGO12eu3zKgogKpH9mAcQ-tA5Fs-MgoCQ9XY3hKT8JiiJLTTVJpwcMYirk42t-AP4ksko0HE6eNowMJQWMgXLx4SMh3aNIDh0sEInTJibyFNVuWg2VnPK03c2SaOTYRyduRm_6Jqh0z-4vfupimEBcXL93YtJFxFk-1pQcC1yrkMXYkmxpKjiyj8nXPeq1_v35_4nvYl_R8y8vuy2i75yS3YYJ8yqjWH6CziP7pb739kJzniXEPmH9szlAjp_b47Owcl7fiX0GaTyzOE",
    dp: "iBy2aGXNsz2rhk_LMdbCFtFUimi8aK-uyaNC4x_BKG5bT_t6EQc8hEKngxF40QNR2YopBvAfUFGs8Oq3hdZqYVqmz0O40Qli3g_BN-_-KATrLcCqEHA6mf9hhSLfeZwgSc15AHaSmHjs2ioobBfdUaKMOrt3cbGun-9k4AEZkuND9oim4A601sH8_1zeSpfsvHNYKiUb8Z-rNcliB5G_pHZ-IpgnD83S_V31oO3earUsx5pcxv6UsCNgrW200naivA83Bf7g7II4v_chPN3fmui_wb9eVmomtMVkT__2WwuaqY0HfaA6l6dWwXtmrbDAPpyhPtpdX5QxKUqzuU9NwQ",
    dq: "ZC72T75KTFA65Yrx3O7a-SSud3SqpPgguHdDL6XpgZQ74DXWhpBIpvDttHX5x7b9VzXR1bvhaefzt_mPnm5xRLHowoM4mQEfnxqQV2MIwhhcbIfLEQmM9vpOoO2h6gD_nC7VchxdEC1kfpWBxyGvrAy5iBW_yQBZdz7IOZgfBxiXv-HVupL2ta4Gx3S_R-qowdTgzlgk1q_zuRYS0tXv8zSo7OHcKzAyXxui1ocl556XungF7dO2n7M5Ury3mxFt_SGnYPTJ0KaL0Kve1cCVbaF9Z3MDpsfSUo8S4Xxmcr3T-Nsq92-roWf2FsAzIIxThIpiCJMB4sJFbRmi-VYFvQ",
    e: "AQAB",
    kty: "RSA",
    n: "tsLKYVeEjKMTXpjfDa7mOKkARqgjboqJ02VXPYZa44rozLwDjaC88kEa6ORNH71xDKj1EtHO0IYL70cs6phcMG7I9obpJH_EyDJOrkqHIYCHRIZmu-8-Spa6t2zMX7DQK3Jxc9GSISHYIPhDHK6ZgAtJKMztKxXwr_2ZYPnsQAlO5GiGn9Y9fE_rLfuV_DlHW1EjJG2X02dIARb249W9bzyGkXthg9ddC9fl-K7J4kI1P3p8Mo7KqhQqeDxnmJNAbEscRwu-vX5uJwEWG5wMOWqwbvjDK6nmwbFXy2PywtD_3gYEMe6c5Vihc2-dEvJ4XX3HXKBSmhokXgTi2C85swNxFfwPhnkp9t_iA9BEG9b3Sob5LMa5YHo6EbrX1KyNHmfwJZONEj-9Cdhs-l8_hMaCPoUHJSEIkXDpgEzivGSbQx24xJGx3VktIAUr9A92qRdrY0V88gnWsmcgLIIOXoRnZYIk4xnTo-Nezj9-TKU8Z_rKqQkLh1ZwEwkEjgieeg3tRrhTp_J-I0qXakC29dFNzecAxuKY4S6T0Qcul_8q85vBuBr1rDy_HI0G2U3zaTMeIms-pfMZtINCpYM4NWAzvIQ_JqqrilUilsVXcsgyMYTR5syIlyLZ3-hOhInJ9ty427wBhii-TyL6alzAvSnQVeeoVOhX5wIzAxgwppk",
    p: "8T92rMg2Ozt6Nj9DQF-gKckia-Ak5dSEcKwCQnunb-ECUJSB6hNeWUdPPlFHsDcvgCN3M3Z2Frczv-ogBIcJIyZ-y3R64cYXiSg0yC2SDmwG_057hXGez4zDcAYDhTs43k8cyX74BILANxp-NyrvVrxNTUNdshPxDn9sjg3pww1XIvs4AF73utAr4EaobdIUTVI6B0rQopYwOYYXYUlFnANXWm-BjPBmbuRTvOUTxvnZNOOPrxo5QvazWX6hgq66Ow5sCpB_eDZQ4WzmU_YBgDlYI3EZ9hbMtDQEItAUIFwX2isZODdVWdn-SebMxjokcL8yJkwv0Aui7pRq0H-pRQ",
    q: "we_C5Fn_yvdtOflbOwJSGsAjinR7BoQ0qfSrhTy4puJFX8BKgCGB4XpcL-iD6xr6_PYf88NZWsH_xcju09FTwQUw1C4W0qKvsHfFwn0dx18jHZNGgO5UExSDBc1ApFJfsbW933QDJlVgUAw47dNFc6x4gjyRYtrHCPKDeEkzmjeZhylaDg4Hbi-_b0QoqBCkB_9awbjHMg59wh0kVzTx85afJ4P_KTir2yy9710_AIKpGhQKma4zjQvm-Hn44BMvMlH1BmvOCx5Nl4K29YXQAA1kV7-omczYnTuLONIIPFgZRre7XB0Hm4w-Bq_K5H598D2hwjqm1rT7b4E05rLbRQ",
    qi: "sxSm2ZjdihhBmS0HLVRE40xUwRhBwSLBVaT1tPY8mj10cWZdpREVipLRF2f1arcLywiAdWqMWqw3cKhkcgCsX-z-tSIciUu7DxViPwFWfx0LsRoPIydrZVvwE6YZIr6R8kLe0GVpi5bhC3OjLMINiIywtZWI-oCYhF_2gBvAG1k2hoKHh_HPKEg07AIsnhOCQugIBSmCSq1eCjy_tXZs-nZy6kITaaWDwb60Np7YuR2XE4yVqmbOW6xOxqX7x3YgjwHDdU7AmIMRMkCL4Bmgr964uwdWxuw7TjmAMWTkOdi12er4iDrr9Xm2xOg6IAkFPBMJtPY2Ls6-16_HXLSGqw",
  });

  console.log("https://arweave.net/raw/" + metadataTransaction.id);

  const response = await arweave.transactions.post(metadataTransaction);
  console.log(response);
  return response;
};
