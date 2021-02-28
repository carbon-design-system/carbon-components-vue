import { useCvId } from '..';
import { reactive } from 'vue';

const fakeProps = id => reactive({ id });

describe('cvId', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Uses Math.random when window is not defined', () => {
    const origMath = global.Math;
    const mockMath = Object.create(global.Math);
    const mockMathRandom = jest.fn().mockReturnValue(0.5);
    mockMath.random = mockMathRandom;
    global.Math = mockMath;

    let props = fakeProps();
    let cvId = useCvId(props);
    expect(cvId.value).toEqual('98888888-9888-4888-a888-988888888888');

    props.id = '1';
    cvId = useCvId(props);
    expect(cvId.value).toEqual(props.id);

    props.id = '';
    expect(cvId.value).toEqual('98888888-9888-4888-a888-988888888888');

    jest.resetAllMocks();
    global.Math = origMath;
    // delete global.Math;
  });

  it('Uses crypto from window when window is defined', () => {
    const origCrypto = global.crypto;
    const mGetRandomValues = jest.fn().mockReturnValue(new Uint32Array(10));
    const mCrypto = { getRandomValues: mGetRandomValues };
    global.crypto = mCrypto;

    let props = fakeProps();
    let cvId = useCvId(props);
    expect(cvId.value).toEqual('10000000-1000-4000-8000-100000000000');
    expect(mGetRandomValues).toBeCalledWith(new Uint8Array(1));

    props.id = '2';
    cvId = useCvId(props);
    expect(cvId.value).toEqual(props.id);

    props.id = '';
    expect(cvId.value).toEqual('10000000-1000-4000-8000-100000000000');

    jest.resetAllMocks();
    global.crypto = origCrypto;
  });
});
