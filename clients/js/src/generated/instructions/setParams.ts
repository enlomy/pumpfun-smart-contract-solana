/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Pda, PublicKey, Signer, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi';
import { Serializer, array, mapSerializer, struct, u8 } from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared';
import { GlobalSettingsInput, GlobalSettingsInputArgs, getGlobalSettingsInputSerializer } from '../types';

// Accounts.
export type SetParamsInstructionAccounts = {
    authority?: Signer;
    global: PublicKey | Pda;
    feeVault: PublicKey | Pda;
    newAuthority?: PublicKey | Pda;
    newMigrationAuthority?: PublicKey | Pda;
    newWithdrawAuthority?: PublicKey | Pda;
    systemProgram?: PublicKey | Pda;
    eventAuthority: PublicKey | Pda;
    program: PublicKey | Pda;
};

  // Data.
  export type SetParamsInstructionData = { discriminator: Array<number>; params: GlobalSettingsInput;  };

export type SetParamsInstructionDataArgs = { params: GlobalSettingsInputArgs;  };


  export function getSetParamsInstructionDataSerializer(): Serializer<SetParamsInstructionDataArgs, SetParamsInstructionData> {
  return mapSerializer<SetParamsInstructionDataArgs, any, SetParamsInstructionData>(struct<SetParamsInstructionData>([['discriminator', array(u8(), { size: 8 })], ['params', getGlobalSettingsInputSerializer()]], { description: 'SetParamsInstructionData' }), (value) => ({ ...value, discriminator: [27, 234, 178, 52, 147, 2, 187, 141] }) ) as Serializer<SetParamsInstructionDataArgs, SetParamsInstructionData>;
}



  
  // Args.
      export type SetParamsInstructionArgs =           SetParamsInstructionDataArgs
      ;
  
// Instruction.
export function setParams(
  context: Pick<Context, "identity" | "programs">,
                        input: SetParamsInstructionAccounts & SetParamsInstructionArgs,
      ): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('pumpFun', 'DkgjYaaXrunwvqWT3JmJb29BMbmet7mWUifQeMQLSEQH');

  // Accounts.
  const resolvedAccounts = {
          authority: { index: 0, isWritable: true as boolean, value: input.authority ?? null },
          global: { index: 1, isWritable: true as boolean, value: input.global ?? null },
          feeVault: { index: 2, isWritable: true as boolean, value: input.feeVault ?? null },
          newAuthority: { index: 3, isWritable: false as boolean, value: input.newAuthority ?? null },
          newMigrationAuthority: { index: 4, isWritable: false as boolean, value: input.newMigrationAuthority ?? null },
          newWithdrawAuthority: { index: 5, isWritable: false as boolean, value: input.newWithdrawAuthority ?? null },
          systemProgram: { index: 6, isWritable: false as boolean, value: input.systemProgram ?? null },
          eventAuthority: { index: 7, isWritable: false as boolean, value: input.eventAuthority ?? null },
          program: { index: 8, isWritable: false as boolean, value: input.program ?? null },
      } satisfies ResolvedAccountsWithIndices;

      // Arguments.
    const resolvedArgs: SetParamsInstructionArgs = { ...input };
  
    // Default values.
  if (!resolvedAccounts.authority.value) {
        resolvedAccounts.authority.value = context.identity;
      }
      if (!resolvedAccounts.systemProgram.value) {
        resolvedAccounts.systemProgram.value = context.programs.getPublicKey('splSystem', '11111111111111111111111111111111');
resolvedAccounts.systemProgram.isWritable = false
      }
      
  // Accounts in order.
      const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a,b) => a.index - b.index);
  
  
  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, "programId", programId);

  // Data.
      const data = getSetParamsInstructionDataSerializer().serialize(resolvedArgs as SetParamsInstructionDataArgs);
  
  // Bytes Created On Chain.
      const bytesCreatedOnChain = 0;
  
  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
