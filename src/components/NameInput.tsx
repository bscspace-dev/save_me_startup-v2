"use client";

// 한글 입력 중에는 자모(ㄱ, ㅏ)가 잠시 섞이므로 자모까지 남기고, 제출 시 pattern으로 완성형만 허용
const strip = (v: string) => v.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");

export function NameInput({ className }: { className?: string }) {
  return (
    <input
      name="name"
      required
      autoComplete="name"
      maxLength={10}
      pattern="[가-힣]{2,10}"
      title="한글 이름을 2자 이상 입력해주세요"
      placeholder="성함을 입력해주세요"
      // 조합 중에 값을 바꾸면 한글 입력이 끊기므로 조합이 끝난 뒤에 거른다
      onChange={(e) => { if (!(e.nativeEvent as InputEvent).isComposing) e.currentTarget.value = strip(e.currentTarget.value); }}
      onCompositionEnd={(e) => { e.currentTarget.value = strip(e.currentTarget.value); }}
      className={className}
    />
  );
}
