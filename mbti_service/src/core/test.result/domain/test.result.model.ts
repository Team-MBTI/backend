import { Destination, DestinationConstructorInput } from './vo/destination.vo';

export class TestResultModel {
  private readonly id: number;
  private testId: number;
  private userId: number;
  private EIResult: number;
  private NSResult: number;
  private FTResult: number;
  private JPResult: number;
  private createdAt: Date;
  private destination: Destination;

  constructor(input: TestResultContructorInput) {
    this.id = input.id;
    this.testId = input.testId;
    this.userId = input.userId;
    this.EIResult = input.EIResult;
    this.NSResult = input.NSResult;
    this.FTResult = input.FTResult;
    this.JPResult = input.JPResult;
    this.destination = new Destination(input.destination);
  }

  public static submitTest(input: SubmitTestInput, destination: Destination) {
    return new TestResultModel({
      EIResult: input.EIResult,
      NSResult: input.NSResult,
      FTResult: input.FTResult,
      JPResult: input.JPResult,
      destination: destination,
      testId: input.testId,
      userId: null,
      id: null,
      createdAt: null,
    });
  }

  public getProperteis() {
    return {
      id: this.id,
      testId: this.testId,
      userId: this.userId,
      EIResult: this.EIResult,
      NSResult: this.NSResult,
      FTResult: this.FTResult,
      JPResult: this.JPResult,
      createdAt: this.createdAt,
      destination: this.destination.getProperties(),
    };
  }

  public static createTestResult(
    input: Omit<TestResultContructorInput, 'id' | 'createdAt' | 'userId'>,
  ) {
    return new TestResultModel({
      ...input,
      id: null,
      createdAt: null,
      userId: null,
    });
  }
}

export type TestResultContructorInput = {
  id: number;
  userId: number;
  testId: number;
  EIResult: number;
  NSResult: number;
  FTResult: number;
  JPResult: number;
  createdAt: Date;
  destination: DestinationConstructorInput;
};

export type SubmitTestInput = Omit<
  TestResultContructorInput,
  'id' | 'createdAt' | 'userId'
>;
