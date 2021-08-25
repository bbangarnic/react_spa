import qs from 'qs';

export default function Search({ location }) {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const filteredQs = Object.entries(query).map((qs) =>
    qs[1] !== '' ? { qs, hasValue: true } : { qs, hasvalue: false },
  );

  return (
    <>
      <h1>Search</h1>
      <form>
        <input name="input1" />
        <input name="input2" />
        <button>전송</button>
      </form>
      {filteredQs.map((v, i) =>
        v.hasValue ? (
          <div key={i}>
            {v.qs[0]} : {v.qs[1]}
          </div>
        ) : (
          <div key={i}>{v.qs[0]}의 값 없음</div>
        ),
      )}
    </>
  );
}
