export namespace CalculatorService {
  export function add(...numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0)
  }
}