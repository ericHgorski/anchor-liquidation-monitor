import { LCDClient } from '@terra-money/terra.js'
import { Anchor, columbus5, AddressProviderFromJson } from '@anchor-protocol/anchor.js'

export const addressProvider = new AddressProviderFromJson(columbus5)
export const lcd = new LCDClient({ URL: 'https://lcd.terra.dev', chainID: 'columbus-5' })
export const anchor = new Anchor(lcd, addressProvider)
