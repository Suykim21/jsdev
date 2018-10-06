class GitHub {
  constructor() {
    this.client_id = 'dfd6b24045ebfbed9637';
    this.client_secret = 'a8f3ca15aafea3315e31178d883db62fbb1ab2fc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const profile = await profileResponse.json();
    return {
      profile
    }
  }
}