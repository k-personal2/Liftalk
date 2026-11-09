/* Client-side storage. Keys match the prototype so saved data carries over. */
const FAV_KEY = "liftalk.favs.v1";
const STUDY_KEY = "liftalk.study.v1";
const DEFAULT_FAVS: number[] = [];

function read<T>(key: string, fallback: T): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? "null");
    return v === null ? fallback : v;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const getFavs = (): number[] => read(FAV_KEY, DEFAULT_FAVS);
export const setFavs = (favs: number[]) => write(FAV_KEY, favs);
export const getStudyIdx = (): number => read(STUDY_KEY, 0);
export const setStudyIdx = (i: number) => write(STUDY_KEY, i);

const ZH_KEY = "liftalk.zh.v1";
export const getShowZh = (): boolean => read<unknown>(ZH_KEY, false) === true;
export const setShowZh = (on: boolean) => write(ZH_KEY, on);

export const FAVS_EVENT = "liftalk:favs";
