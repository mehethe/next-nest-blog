import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogStatus } from './blog-status.enum';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetAllBlogsDto } from './dto/get-all-blogs.dto';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Blog, Prisma, Status } from '@prisma/client';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthUser } from 'src/auth/auth-user.model';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async getAllBlogs(getAllBlogsDto: GetAllBlogsDto): Promise<{
    success: boolean;
    message: string;
    data: { data: Blog[]; pages: number };
  }> {
    const { status, sort, page, limit, search, author } = getAllBlogsDto;

    const PAGE_LIMIT = Number(limit) || 10;
    const PAGE = Number(page) || 1;

    const query: Prisma.BlogWhereInput = {
      deletedAt: null,
    };

    if (status) {
      query.status = status;
    }

    if (author) {
      query.authorId = author;
    }

    if (search) {
      query.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    //sort
    const sortOption: Prisma.BlogOrderByWithRelationInput = {};

    if (sort === 'name') {
      //'name', 'date'

      sortOption.title = 'asc';
    } else {
      sortOption.createdAt = 'desc';
    }

    const [blogs, count] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        where: query,
        orderBy: [sortOption],
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        take: PAGE_LIMIT,
        skip: PAGE_LIMIT * (PAGE - 1),
      }),
      this.prisma.blog.count({ where: query }),
    ]);

    const pages = Math.ceil(count / PAGE_LIMIT);

    return {
      success: true,
      message: `Blogs fetched successfully.`,
      data: { data: blogs, pages },
    };
  }

  async getBlogById(id: string): Promise<{
    success: boolean;
    message: string;
    data: Blog;
  }> {
    const blog = await this.prisma.blog.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`); //default Not Found
    }

    return {
      success: true,
      message: `Blog fetched successfully`,
      data: blog,
    };
  }

  async createBlog(
    createBlogDto: CreateBlogDto,
    user: AuthUser,
  ): Promise<{
    success: boolean;
    message: string;
    data: Blog;
  }> {
    const { title, cover, content } = createBlogDto;

    const blog = await this.prisma.blog.create({
      data: {
        authorId: user.id,
        title,
        cover,
        content,
      },
    });

    return {
      success: true,
      message: `Blog created successfully`,
      data: blog,
    };
  }

  async deleteBlog(id: string): Promise<{
    success: boolean;
    message: string;
    data: null;
  }> {
    await this.prisma.blog.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: `Blog deleted successfully`,
      data: null,
    };
  }

  async updateBlogStatus(
    id: string,
    status: BlogStatus,
  ): Promise<{
    success: boolean;
    message: string;
    data: Blog;
  }> {
    await this.getBlogById(id);
    const blog = await this.prisma.blog.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return {
      success: true,
      message: `Blog status updated successfully`,
      data: blog,
    };
  }

  async updateBlog(
    id: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: Blog;
  }> {
    const { title, content, cover } = updateBlogDto;

    const result = await this.prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        cover,
        status: Status.PENDING, //changed to public so that admin can review again
      },
    });

    return {
      success: true,
      message: `Blog updated successfully`,
      data: result,
    };
  }
}
