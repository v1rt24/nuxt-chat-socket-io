export default function ({store, redirect}) {
  if (!store.getters['getUser']) {
    redirect('/?message=noUser');
  }
}
