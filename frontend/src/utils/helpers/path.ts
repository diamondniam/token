export function _ipfs(id: string) {
  return `https://coral-faithful-crow-317.mypinata.cloud/ipfs/${id}`;
}

export const paths = {
  ipfs: _ipfs,
};
