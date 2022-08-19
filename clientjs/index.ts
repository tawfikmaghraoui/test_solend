import {
    Account,
    Connection,
    PublicKey,
    sendAndConfirmTransaction,
    SYSVAR_CLOCK_PUBKEY,
    Transaction,
    TransactionInstruction,
  } from "@solana/web3.js";
  //import BN from "bn.js";
  //import * as BufferLayout from "buffer-layout";
  import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
export async function mobile(
    //collateralAmount: number | BN,
    //collateralAmount: number,
    sourceCollateral: PublicKey,
    destinationCollateral: PublicKey,
    depositReserve: PublicKey,
    obligation: PublicKey,
    lendingMarket: PublicKey,
    obligationOwner: PublicKey,
    transferAuthority: PublicKey )  {

        let programId= new PublicKey("29Da3Ek9wAdU5V7ZbgUxqi1h4Cy5tFNjByMKj1cEngNR")
        let wallet= new Account([203,214,234,196,65,154,197,110,86,88,245,158,243,187,244,115,70,166,74,27,108,253,132,166,11,146,149,175,250,145,18,164,218,191,205,244,153,50,70,218,149,83,58,170,85,19,18,229,204,64,179,163,74,137,247,163,15,142,223,28,168,124,248,130]);
        console.log(" hello solend ",wallet.publicKey.toBase58());
        /* const dataLayout = BufferLayout.struct([
          BufferLayout.u8("instruction"),
          Layout.uint64("collateralAmount"),
        ]); */
      
        const data = Buffer.from([]);
       /*  dataLayout.encode(
          {
            instruction: 0,
            collateralAmount: new BN(collateralAmount),
          },
          data
        ); */
      
        const keys = [
          { pubkey: sourceCollateral, isSigner: false, isWritable: true },
          { pubkey: destinationCollateral, isSigner: false, isWritable: true },
          { pubkey: depositReserve, isSigner: false, isWritable: false },
          { pubkey: obligation, isSigner: false, isWritable: true },
          { pubkey: lendingMarket, isSigner: false, isWritable: false },
          { pubkey: obligationOwner, isSigner: true, isWritable: false },
          { pubkey: transferAuthority, isSigner: true, isWritable: false },
          { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ];
      
        let instruction = new TransactionInstruction({
          keys,
          programId: programId,
          data,
        });
        let connection =new Connection("https://api.devnet.solana.com")
        let tx= await sendAndConfirmTransaction(
            connection,
            new Transaction().add(instruction),
            [wallet],
          );
          console.log("txtx",tx)
}


  async function main(){
    let sourceCollateral = new PublicKey("FiuWdzTh3tcpckrCPpPvHeWsKY8diH6mqLYYFbEJizsK");
    mobile(
        sourceCollateral,
        destinationCollateral,
        depositReserve,
        obligation,
        lendingMarket,
        obligationOwner:,
        transferAuthority
    );
  }

  main();
/* export const depositObligationCollateralInstruction = (
    collateralAmount: number | BN,
    sourceCollateral: PublicKey,
    destinationCollateral: PublicKey,
    depositReserve: PublicKey,
    obligation: PublicKey,
    lendingMarket: PublicKey,
    obligationOwner: PublicKey,
    transferAuthority: PublicKey,
    solendProgramAddress: PublicKey
  ): TransactionInstruction => {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8("instruction"),
      Layout.uint64("collateralAmount"),
    ]);
  
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 8,
        collateralAmount: new BN(collateralAmount),
      },
      data
    );
  
    const keys = [
      { pubkey: sourceCollateral, isSigner: false, isWritable: true },
      { pubkey: destinationCollateral, isSigner: false, isWritable: true },
      { pubkey: depositReserve, isSigner: false, isWritable: false },
      { pubkey: obligation, isSigner: false, isWritable: true },
      { pubkey: lendingMarket, isSigner: false, isWritable: false },
      { pubkey: obligationOwner, isSigner: true, isWritable: false },
      { pubkey: transferAuthority, isSigner: true, isWritable: false },
      { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ];
  
    return new TransactionInstruction({
      keys,
      programId: solendProgramAddress,
      data,
    });
  }; */