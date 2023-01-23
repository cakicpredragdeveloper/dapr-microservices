export default interface IJoiner<I1, I2, O> {
    join(input1: I1, input2: I2 ): O;
}