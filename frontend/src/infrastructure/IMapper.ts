export default interface IMapper<I, O> {
    map(input: I): O;
}