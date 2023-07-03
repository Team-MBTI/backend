import { PROVIDER } from './vo/provider';

export type UserConstructorInput = {
  id: number;
  provider: string;
  email: string;
  password: string;
  phoneNumber: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
};
export type CommonUserSignUpType = Omit<
  UserConstructorInput,
  'id' | 'updatedAt' | 'provider'
>;
export type SocialUserSignUpType = Omit<
  UserConstructorInput,
  'id' | 'updatedAt' | 'provider' | 'password' | 'phoneNumber'
>;

export class UserModel {
  private readonly id: number;
  private readonly provider: string;
  private email: string;
  private password: string;
  private phoneNumber: string;
  private nickname: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(input: UserConstructorInput) {
    this.id = input.id;
    this.provider = input.provider;
    this.email = input.email;
    this.password = input.password;
    this.phoneNumber = input.phoneNumber;
    this.nickname = input.nickname;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  public static signUpCommon(input: CommonUserSignUpType) {
    return new UserModel({
      ...input,
      id: null,
      updatedAt: null,
      provider: PROVIDER.COMMON,
    });
  }

  public static signUpSocial(input: SocialUserSignUpType) {
    return new UserModel({
      ...input,
      id: null,
      updatedAt: null,
      provider: PROVIDER.KAKAO,
      password: null,
      phoneNumber: null,
    });
  }

  public getProperties() {
    return {
      id: this.id,
      provider: this.provider,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      nickname: this.nickname,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
