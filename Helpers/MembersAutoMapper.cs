using AutoMapper;
using DatingApp.DTOs;
using DatingApp.Entities;

namespace DatingApp.Helpers
{
    public class MembersAutoMapper : Profile
    {
        public MembersAutoMapper()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo, PhotoDTO>();
        }
    }
}
