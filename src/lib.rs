
use solana_program::program::invoke_signed;
use solana_program::{
    instruction::{AccountMeta, Instruction},
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    sysvar::{clock::Clock, rent::Rent, Sysvar},
};

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {

    let account_info_iter = &mut accounts.iter();
    let source_collateral_info = next_account_info(account_info_iter)?;
    let destination_collateral_info = next_account_info(account_info_iter)?;
    let deposit_reserve_info = next_account_info(account_info_iter)?;
    let obligation_info = next_account_info(account_info_iter)?;
    let lending_market_info = next_account_info(account_info_iter)?;
    let obligation_owner_info = next_account_info(account_info_iter)?;
    let user_transfer_authority_info = next_account_info(account_info_iter)?;
    //let clock = &Clock::from_account_info(next_account_info(account_info_iter)?)?;
    let clock = next_account_info(account_info_iter)?;
    let token_program_id = next_account_info(account_info_iter)?;
    let crate_address=next_account_info(account_info_iter)?;
    let authority_pubkey = next_account_info(account_info_iter)?;
    let solend_program_id=next_account_info(account_info_iter)?;
    let collateral_amount: u64=10;

    let nonce=instruction_data[0];
    let signature_seeds = [&crate_address.key.to_bytes()[..32], &[nonce]];
    let signers = &[&signature_seeds[..]];

    let mut buf = Vec::new();
    let mut vac_accounts = Vec::new();
    buf.push(8);
    buf.extend_from_slice(&collateral_amount.to_le_bytes());

    //ac_accounts.push(AccountMeta::new(*source_b_info.key, false));
    //vac_accounts.push(AccountMeta::new(*authority_info.key, false)); // Destination
    //vac_accounts.push(AccountMeta::new(*authority_ppu_info.key, true)); // Owner
    vac_accounts.push(AccountMeta::new(*source_collateral_info.key, false));
    vac_accounts.push(AccountMeta::new(*destination_collateral_info.key, false));
    vac_accounts.push(AccountMeta::new(*deposit_reserve_info.key, false));
    vac_accounts.push(AccountMeta::new(*obligation_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*lending_market_info.key, false));
    vac_accounts.push(AccountMeta::new_readonly(*obligation_owner_info.key, true));
    vac_accounts.push(AccountMeta::new_readonly(*user_transfer_authority_info.key, true));
    vac_accounts.push(AccountMeta::new_readonly(*clock.key, false));
    vac_accounts.push(AccountMeta::new_readonly(spl_token::id(), false));

    let ix = Instruction {
        accounts: vac_accounts,
        program_id: *solend_program_id.key,
        data: buf,
    };
    invoke_signed(
        &ix,
        &[
            source_collateral_info.clone(),
            destination_collateral_info.clone(),
            deposit_reserve_info.clone(),
            obligation_info.clone(),
            lending_market_info.clone(),
            obligation_owner_info.clone(),
            user_transfer_authority_info.clone(),
            clock.clone()
            ],
            signers,
        )?;
    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
