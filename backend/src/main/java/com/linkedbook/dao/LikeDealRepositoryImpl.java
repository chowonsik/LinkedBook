package com.linkedbook.dao;

import java.util.ArrayList;
import java.util.List;

import com.linkedbook.dto.likeDeal.selectLikeDeal.QSelectLikeDealOutput;
import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealOutput;
import com.linkedbook.entity.QBookDB;
import com.linkedbook.entity.QDealDB;
import com.linkedbook.entity.QDealImageDB;
import com.linkedbook.entity.QImageDB;
import com.linkedbook.entity.QLikeDealDB;
import com.linkedbook.entity.QUserDB;
import com.linkedbook.entity.QUserDealDB;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LikeDealRepositoryImpl implements LikeDealRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QDealDB dealDB = QDealDB.dealDB;
    QBookDB bookDB = QBookDB.bookDB;
    QDealImageDB dealImageDB = QDealImageDB.dealImageDB;
    QImageDB imageDB = QImageDB.imageDB;
    QLikeDealDB likeDealDB = QLikeDealDB.likeDealDB;
    QUserDB userDB = QUserDB.userDB;
    QUserDealDB userDealDB = QUserDealDB.userDealDB;

    @Override
    public Page<SelectLikeDealOutput> findByUserId(int userId, int myId, Pageable pageable) {

        List<SelectLikeDealOutput> queryResult = queryFactory
                .select(new QSelectLikeDealOutput(dealDB.id, dealDB.title, imageDB.imageurl.coalesce("").as("imageurl"),
                        dealDB.price, dealDB.quality, dealDB.created_at,
                        JPAExpressions.select(likeDealDB.count().castToNum(Integer.class)).from(likeDealDB)
                                .where(likeDealDB.user.id.eq(myId).and(likeDealDB.deal.id.eq(dealDB.id))),
                        bookDB.title, bookDB.author, bookDB.publisher))
                .from(likeDealDB).join(likeDealDB.deal, dealDB).join(likeDealDB.user, userDB).join(dealDB.book, bookDB)
                .leftJoin(dealDB.images, dealImageDB).on(dealImageDB.orders.eq(1)).leftJoin(dealImageDB.image, imageDB)
                .where(likeDealDB.user.id.eq(userId), dealDB.status.eq("ACTIVATE"), userDB.status.eq("ACTIVATE"))
                .orderBy(getOrderSpecifier(pageable.getSort()).stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

        List<SelectLikeDealOutput> content = queryResult;
        long totalCount = queryResult.size();
        return new PageImpl<SelectLikeDealOutput>(content, pageable, totalCount);
    }

    private List<OrderSpecifier> getOrderSpecifier(Sort sort) {
        List<OrderSpecifier> orders = new ArrayList<>();
        sort.stream().forEach(order -> {
            Order direction = order.isAscending() ? Order.ASC : Order.DESC;
            String prop = order.getProperty();
            PathBuilder pathBuilder = new PathBuilder(dealDB.getType(), dealDB.getMetadata());
            orders.add(new OrderSpecifier(direction, pathBuilder.get(prop)));
        });
        return orders;
    }

}
