import {IMembership, Page, IMember} from "ht-models";

export class HtMemberhips {
  data: IMembership;
  constructor(membership?: IMembership) {
    this.data = membership;
  }

  procMembershipPage(membershipPage: Page<IMembership> | null) {
    if (membershipPage && membershipPage.results) {
      const results = membershipPage.results.map((membership) => {
        return this.procMembership(membership)
      });
      return {...membershipPage, results}
    } else {
      return membershipPage
    }
  }

  procMembership(membership: IMembership): IMembership {
    const name = this.getMembersName(membership);
    membership.account.name = name;
    return membership;

  }

  private getMembersName(member: IMembership) {
    const matchMember: IMember = member.account.members.find((member: IMember) => member.role === 'owner');
    return !matchMember || member.account.name != 'Unnamed account' ? member.account.name : matchMember.user.email;
  }
};

export const htMemberships = (membership?: IMembership) => {
  return new HtMemberhips(membership)
};